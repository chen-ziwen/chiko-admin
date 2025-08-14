import { useTranslation } from 'react-i18next';

interface Author {
  name: string;
  email: string;
  url: string;
}

interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: Author;
  license: string;
  homepage: string;
  repository: { url: string };
  bugs: { url: string };
  keywords: string[];
}

interface PackageInfoProps {
  packageInfo: PackageInfo;
}

const PackageInfo = ({ packageInfo }: PackageInfoProps) => {
  const { t } = useTranslation();

  return (
    <ACard title={t('page.projectIntro.basicInfo')} className="card-wrapper">
      <ADescriptions column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }} bordered>
        <ADescriptions.Item label={t('page.projectIntro.projectName')}>
          <ATag color="blue">{packageInfo.name}</ATag>
        </ADescriptions.Item>
        <ADescriptions.Item label={t('page.projectIntro.version')}>
          <ATag color="green">v{packageInfo.version}</ATag>
        </ADescriptions.Item>
        <ADescriptions.Item label={t('page.projectIntro.projectDescription')}>
          {packageInfo.description}
        </ADescriptions.Item>
        <ADescriptions.Item label={t('page.projectIntro.license')}>
          <ATag color="orange">{packageInfo.license}</ATag>
        </ADescriptions.Item>
        <ADescriptions.Item label={t('page.projectIntro.author')}>
          <div className="space-y-2">
            <div className="font-medium">{packageInfo.author.name}</div>
            <div className="text-sm text-gray-500">{packageInfo.author.email}</div>
            <AButton
              type="link"
              size="small"
              className="h-auto p-0 !text-blue-600 dark:!text-blue-400"
              onClick={() => window.open(packageInfo.author.url, '_blank')}
            >
              {t('page.projectIntro.viewAuthorHomepage')}
            </AButton>
          </div>
        </ADescriptions.Item>
        <ADescriptions.Item label={t('page.projectIntro.projectUrl')}>
          <AButton
            type="link"
            className="h-auto p-0 !text-blue-600 dark:!text-blue-400"
            onClick={() => window.open(packageInfo.homepage, '_blank')}
          >
            {packageInfo.homepage}
          </AButton>
        </ADescriptions.Item>
        <ADescriptions.Item label={t('page.projectIntro.issueFeedback')}>
          <AButton
            type="link"
            className="h-auto p-0 !text-blue-600 dark:!text-blue-400"
            onClick={() => window.open(packageInfo.bugs.url, '_blank')}
          >
            {packageInfo.bugs.url}
          </AButton>
        </ADescriptions.Item>
      </ADescriptions>
    </ACard>
  );
};

export default PackageInfo;
