import { useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import router from 'next/router';
import { Box } from '@mui/joy';
import { Button } from '@mui/joy';

import CashDrawerModal from '@/components/CashDrawerModal';
import { useHeaderState } from '@/hooks/useHeaderState';
import PageTransition from '@/components/PageTransition';
import ActionBar from '@/components/ActionBar';
import OrderingBar from '@/components/OrderingBar';

export default function Admin() {
  const t = useTranslations('common')
  useHeaderState({ title: t('Admin') });

  const [show, setShow] = useState(false)
  const [showActionBar, setShowActionBar] = useState(false)

  return (
    <PageTransition>
      <Box className="relative h-full w-full bg-gradient-to-r from-sky-500 to-indigo-500">
        Admin page...
        <Button onClick={() => {
          setShow(true)
        }}>test cash</Button>

        {/* 底部bar */}
        <Box className="absolute inset-x-6 bottom-4">
          {showActionBar && <ActionBar
            text="Get €3.00 off, when you spend €1.50 more!"
            secondaryText="Available date: Dec 20 - 25, 2023" />}
          <OrderingBar
            total={0}
            secondaryText={t('Cancel')}
            confirmText={t('Confirm')}
            cartCount={6}
            className='relative z-20'
            onSecondary={() => setShowActionBar((show) => !show)}
            onConfirm={() => router.push('/ordering/payment-detail')} />
        </Box>
      </Box>
      <CashDrawerModal t={t} open={show} onClose={() => setShow(false)}/>
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