import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Button, Stack } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PropTypes from 'prop-types';

function AccordionHeader(props) {
  const { name, icon } = props;
  return (
    <div style={{ width: '100%' }}>
      <Accordion sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            padding: 0, justifyContent: 'space-between', margin: '0',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Stack direction="column">
            <Button
              startIcon={<KeyboardDoubleArrowRightIcon />}
              variant="text"
              sx={{ justifyContent: 'flex-start', paddingLeft: 0 }}
              color="inherit"
            >
              Lessons
            </Button>
            <Button
              startIcon={<KeyboardDoubleArrowRightIcon />}
              variant="text"
              sx={{ justifyContent: 'flex-start', paddingLeft: 0 }}
              color="inherit"
            >
              Homework
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

AccordionHeader.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
export default AccordionHeader;
