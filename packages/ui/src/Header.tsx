import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import { Box, Avatar, Typography, IconButton, AvatarGroup, Button } from '@mui/joy';
import Search from './Search';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { BackIcon } from './icons';

type Props = {
  className: string,
  showBack: boolean,
  pageTitle: string,
  showSearch: boolean,
  users?: Array<{name: string, id: string, selected?: boolean}>,
  onMenuClick: () => void,
  onBackClick: () => void,
  onLogin: () => void,
  onLogout: () => void,
  onSwitchUser: () => void,
}

export default function Header({
  className,
  showBack = false,
  pageTitle,
  showSearch = true,
  users,
  onMenuClick,
  onBackClick,
  onLogin,
  onLogout,
  onSwitchUser,
}: Props) {
  return (
    <Sheet
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--Header-height)',
        pt: 3,
        pb: 2,
        px: 2.5,
        gap: 1,
        // borderBottom: '1px solid',
        // borderColor: 'background.level1',
        // boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '3.25rem',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '5rem',
            },
          },
        })}
      />
      {showBack && <IconButton
          sx={{
            '--Icon-fontSize': '2rem',
          }}
          variant="plain"
          color="neutral"
          onClick={onBackClick}
        >
          <BackIcon size={32} />
        </IconButton>}
      <Typography className="md:inline-block" level="h1" fontSize="xl">
        {pageTitle}
      </Typography>
      <IconButton className="inline-block md:hidden" variant="plain" color="neutral" onClick={() => onMenuClick()}>
        <Bars3Icon />
      </IconButton>
      <Box className="ml-auto flex space-x-2">
        {showSearch && <Search />}
        {users && users.length > 0 ? <AvatarGroup
          // variant='solid'
          sx={{
            width: '80px',
            flexDirection: 'row-reverse',
            "--AvatarGroup-gap": "-20px",
            "& > div:nth-child(1)": {
              transform: "scale(0.6)",
            },
            "& > div:nth-child(2)": {
              transform: "scale(0.8)",
            },
            "& > div:not(:last-child)": {
              filter: "blur(2px)",
            },
          }}
          // onClick={onLogout}
          onClick={onSwitchUser}
        >
          {[...users].sort((a, b) => a.selected ? -1 : 1).slice(0,3).reverse().map((user) => (
            <Avatar key={user.name} alt={"Binary file"} src={`http://121.46.249.133:8069/web/image?model=hr.employee&id=${user.id}&field=image_128`}>{user.name}</Avatar>
          ))}
        </AvatarGroup> : <Button
          variant="solid"
          color="neutral"
          className="rounded-[100px]"
          onClick={onLogin}
        >Log in</Button>}
      </Box>
    </Sheet>
  );
}
