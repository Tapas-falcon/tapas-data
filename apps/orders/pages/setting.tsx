import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

import { useHeaderState } from '@/hooks/useHeaderState';
import PageTransition from '@/components/PageTransition';

export default function Setting() {
  const t = useTranslations('common')
  useHeaderState({ title: t('Setting') });

  return (
    <PageTransition>
      Setting page...
    </PageTransition>
  )
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  };
}