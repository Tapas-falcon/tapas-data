import { ReactNode, useEffect, useState } from "react"
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItem,
  Drawer,
  ListItemDecorator,
  listItemDecoratorClasses,
  ListItemContent,
  Sheet,
} from "@mui/joy"
import { useTranslations } from "use-intl"

import WithTrans from "../utils/WithTrans"
import { AdminPanelIcon, OrderListIcon, OrderingIcon, PaymentsIcon, SettingsIcon, SettlementIcon } from '../icons'

import en from './i18n/en'
import es from './i18n/es'
import zh from './i18n/zh'

const i18n: any = { en, es, zh }
type Props = { 
  className: string,
  collapse: boolean,
  iconImg: ReactNode,
  path: string,
  onNav: (path: string) => void,
  onCollapseChange: (collapse: boolean) => void,
}
const drawListProps = {
  ['aria-label']: "Sidebar",
  sx: {
    '--ListItem-paddingLeft': '0',
    '--ListItem-paddingY': '0.5rem',
    '--ListItemDecorator-size': '64px',
    '--ListItem-minHeight': '32px',
    '--List-nestedInsetStart': '13px',
    '--List-gap': '0.75rem',
    '--variant-plainActiveBg': 'var(--joy-palette-neutral-540)',
    '--variant-plainHoverBg': 'var(--joy-palette-neutral-540)',
    '--variant-plainColor': 'var(--joy-palette-neutral-79)',
    '--variant-plainHoverColor': 'var(--joy-palette-common-white)',
    '--Icon-fontSize': '1.25rem',
    [`& .${listItemDecoratorClasses.root}`]: {
      justifyContent: 'flex-end',
      pr: '18px',
    },
    '& [role="button"]': {
      borderRadius: '20px 20px 20px 20px',
    },
    flexGrow: 0,
  }
}
const routes = ['ordering', 'order-data'];

function Nav({className, collapse, iconImg, path, onNav, onCollapseChange}: Props) {
  const [menuCollapse, setMenuCollapse] = useState(true)
  const [index, setIndex] = useState(routes.indexOf(path))
  const t = useTranslations('Nav')

  useEffect(() => {
    setMenuCollapse(collapse)
  }, [collapse])

  const toggleMenu = () => {
    const nextState = !collapse
    setMenuCollapse(nextState)
    onCollapseChange(nextState)
  }

  const onSelectItem = (index: number) => {
    setIndex(index)

    onNav(`/${routes[index]}`)
  }

  return (
    <Box
      className={`${className} grow-0`}
      sx={{
        height: '100vh',
        borderRadius: 4,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Box
        className="relative w-14 h-14"
        onClick={toggleMenu}
      >
        {/* {menuCollapse ? <ChevronRightIcon/> : <ChevronLeftIcon/>} */}
        {iconImg}
      </Box>
      <Sheet
        className="w-14"
        variant="solid"
        color="primary"
        sx={(theme) => ({
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          px: 1,
          py: 4.5,
          gap: 2,
          '--variant-softColor': 'var(--joy-palette-common-white)',
          '--variant-softHoverColor': 'var(--joy-palette-common-white)',
          '--variant-softBg': 'var(--joy-palette-neutral-540)',
          '--variant-softHoverBg': 'var(--joy-palette-neutral-540)',
          // '--variant-softActiveBg': 'rgba(0, 0, 0, 0.54)',
          '& .MuiIconButton-root': {
            '--joy-fontSize-md': '1.25rem',
            '--IconButton-size': '2.5rem',
            '--Icon-fontSize': '1.25rem',
            '--IconButton-radius': '50%',
            paddingInline: 0,
          }
        })}
      >
        {/*<IconButton variant={index === 0 ? 'soft' : 'solid'} color="primary" onClick={() => onSelectItem(0)} size="md">
          <OrderingIcon size={20}/>
        </IconButton>*/}
        <IconButton variant={index === 1 ? 'soft' : 'solid'} color="primary" onClick={() => onSelectItem(1)} size="md">
          <OrderListIcon size={20}/>
        </IconButton>

      </Sheet>
      <Drawer
        anchor='left'
        size='sm'
        open={!menuCollapse}
        onClose={toggleMenu}
      >
        <Box
          className="bg-black w-full h-14 flex justify-center"
          onClick={toggleMenu}
        >
          <Box className="relative w-14 h-14">
            {iconImg}
          </Box>
        </Box>
        <Sheet
          variant='solid'
          color='primary'
          // invertedColors
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: 1,
            py: 4.5,
            gap: 2,
          }}
        >
          <List {...drawListProps}>
            <ListItem>
              <ListItemButton
                selected={index === 0}
                onClick={() => onSelectItem(0)}
              >
                <ListItemDecorator>
                  <OrderingIcon size={20} />
                </ListItemDecorator>
                <ListItemContent>{t('Ordering')}</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={index === 1}
                onClick={() => onSelectItem(1)}
              >
                <ListItemDecorator>
                  <OrderListIcon size={20} />
                </ListItemDecorator>
                <ListItemContent>{t('OrderList')}</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={index === 2}
                onClick={() => onSelectItem(2)}
              >
                <ListItemDecorator>
                  <PaymentsIcon size={20} />
                </ListItemDecorator>
                <ListItemContent>{t('WithdrawCash')}</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={index === 3}
                onClick={() => onSelectItem(3)}
              >
                <ListItemDecorator>
                  <AdminPanelIcon size={20} />
                </ListItemDecorator>
                <ListItemContent>{t('Admin')}</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
          <List {...drawListProps}>
            <ListItem>
              <ListItemButton
                selected={index === 4}
                onClick={() => onSelectItem(4)}
              >
                <ListItemDecorator>
                  <SettlementIcon size={20} />
                </ListItemDecorator>
                <ListItemContent>{t('DailySettlement')}</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={index === 5}
                onClick={() => onSelectItem(5)}
              >
                <ListItemDecorator>
                  <SettingsIcon size={20} />
                </ListItemDecorator>
                <ListItemContent>{t('Setting')}</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
        </Sheet>
      </Drawer>
      {/* <Box
        className='transition-[max-width] duration-200 ease-in-out'
        sx={{
          overflow: 'hidden',
          maxWidth: menuCollapse ? 0 : 300
        }}
      >
        <Sheet
          color='warning'
          variant='soft'
          sx={{
            p: 2,
            height: '100%',
            bgcolor: 'warning.400',
          }}
        >
          <List
            sx={{
              '--ListItem-radius': '8px',
              '--List-gap': '4px',
              flexGrow: 0,
              minWidth: 200,
            }}
          >
            <ListItemButton>
              {t('dashboard')}
            </ListItemButton>
            <ListItemButton selected variant="soft">
              {t('chat')}
            </ListItemButton>
            <ListItemButton>
              {t('team')}
            </ListItemButton>
            <ListItem nested>
              <ListSubheader>{t('shortcuts')}</ListSubheader>
              <List>
                <ListItemButton>{t('tasks')}</ListItemButton>
                <ListItemButton>{t('reports')}</ListItemButton>
              </List>
            </ListItem>
          </List>
        </Sheet>
      </Box> */}
    </Box>
  )
}

export default function(props: Props) {
  return (
    <WithTrans messages={i18n}>
      <Nav {...props}></Nav>
    </WithTrans>
  )
}
