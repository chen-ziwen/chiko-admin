export type LocationQueryValue = string | null;

/**
 * Normalized query object that appears in {@link RouteLocationNormalized}
 *
 * @public
 */
export type LocationQuery = Record<string, LocationQueryValue | LocationQueryValue[]>;
export type LocationQueryValueRaw = LocationQueryValue | number | undefined;

export type LocationQueryRaw = Record<string | number, LocationQueryValueRaw | LocationQueryValueRaw[]>;

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a version with the leading `?` and without
 * Should work as URLSearchParams
 *
 * @param search - search string to parse
 * @returns a query object
 * @internal
 */
export function parseQuery(search: string): LocationQuery {
  const query: LocationQuery = {};
  // URLSearchParams 构造函数能自动处理以 '?' 开头的字符串
  const searchParams = new URLSearchParams(search);

  // 遍历所有键值对。URLSearchParams 会自动将 '+' 解码为空格。
  // 对于具有相同键的多个值 (例如 `foo=a&foo=b`)，URLSearchParams 会将它们都保留。
  // 通过 getAll(key) 可以获取某个键的所有值。
  for (const key of searchParams.keys()) {
    const values = searchParams.getAll(key);
    // 根据值的数量，将其存储为单个值或数组
    if (values.length === 1) {
      query[key] = values[0];
    } else {
      query[key] = values;
    }
  }

  return query;
}

export function stringifyQuery(query: LocationQueryRaw): string {
  const searchParams = new URLSearchParams();

  for (const [originalKey, value] of Object.entries(query)) {
    // URLSearchParams 会自动对键和值进行标准 URL 编码。
    // 空格会被编码为 '+'，文字的 '+' 会被编码为 '%2B'。

    if (value === undefined) {
      // 按照标准 URL 参数处理，undefined 值不应出现在查询字符串中。
      continue;
    }

    if (value === null) {
      // 对于 null 值，我们将追加一个空字符串，结果是 `key=`。
      // 这是 URLSearchParams 的标准行为，也是处理“无值”参数的常见方式。
      searchParams.append(originalKey, '');
    } else if (Array.isArray(value)) {
      // 如果值是数组，遍历数组中的每个项
      for (const item of value) {
        if (item !== undefined) {
          // 数组中的 undefined 项被跳过。
          // 其他项（包括 null）被转换为字符串并追加。
          searchParams.append(originalKey, item === null ? '' : String(item));
        }
      }
    } else {
      // 处理单个非 null、非 undefined 的值
      searchParams.append(originalKey, String(value));
    }
  }

  return searchParams.toString();
}
