import { ReactNode } from 'react'
import { useLocale } from 'next-intl'
import { IntlProvider } from "use-intl"

type Prop = {
  children: ReactNode,
  messages: any,
}

export default function WithTrans({ children, messages }: Prop){
  const locale = useLocale()
  console.log(locale);
  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      {children}
    </IntlProvider>
  )
}
