import { useTranslation } from 'react-i18next';

interface QuickActionsProps {
  homepage: string;
  bugsUrl: string;
  keywords: string[];
}

const QuickActions = ({ homepage, bugsUrl, keywords }: QuickActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <ACard title={t('page.projectIntro.techStack')} className="card-wrapper">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm text-gray-700 font-medium dark:text-gray-300">
              {t('page.projectIntro.keywordTags')}：
            </h4>
            <div className="flex flex-wrap gap-1">
              {keywords.map((keyword, index) => (
                <ATag key={index} color="blue" className="text-xs">
                  {keyword}
                </ATag>
              ))}
            </div>
          </div>
        </div>
      </ACard>

      <ACard title={t('page.projectIntro.quickActions')} className="card-wrapper">
        <div className="flex flex-col gap-3">
          <AButton
            type="primary"
            icon={<SvgIcon icon="mingcute:github-line" />}
            onClick={() => window.open(homepage, '_blank')}
            className="w-full"
            size="large"
          >
            {t('page.projectIntro.viewGitHub')}
          </AButton>
          <AButton
            icon={<SvgIcon icon="mingcute:bug-line" />}
            onClick={() => window.open(bugsUrl, '_blank')}
            className="w-full"
            size="large"
          >
            {t('page.projectIntro.issueReport')}
          </AButton>
          <AButton
            icon={<SvgIcon icon="mingcute:star-line" />}
            onClick={() => window.open(homepage, '_blank')}
            className="w-full"
            size="large"
          >
            {t('page.projectIntro.giveStar')}
          </AButton>
        </div>
      </ACard>
    </div>
  );
};

export default QuickActions;
