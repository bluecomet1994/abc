import * as React from 'react';
import { Container, Tabs, Tab, Typography, Box } from '@mui/material';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ContactsIcon from '@mui/icons-material/Contacts';
import ArticleIcon from '@mui/icons-material/Article';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabItem {
  id: number;
  title: string;
}

const items: TabItem[] = [
  {
    id: 1,
    title: "Fixed Term Contract"
  },
  {
    id: 2,
    title: "Personal Details"
  },
  {
    id: 3,
    title: "Upload Docs"
  },
]

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" className='flex w-full h-full py-8 overflow-auto'>
      <Box className="flex w-full h-full">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {
            items.map(item => (
              <Tab
                iconPosition='start'
                label={item.title}
                key={item.id}
                {...a11yProps(item.id)}
                sx={{
                  justifyContent: "start",
                  textTransform:'none'
                }}
              />
            ))
          }
        </Tabs>

        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Container>
  );
}