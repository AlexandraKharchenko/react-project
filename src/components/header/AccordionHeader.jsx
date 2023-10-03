import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Stack } from '@mui/material';
import { IoArrowForwardOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AccordionHeader(props) {
  const {
    name, icon, lessonPath, homeworkPath,
  } = props;
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
          <Stack direction="column" spacing={2}>
            <Link
              to={lessonPath}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <IoArrowForwardOutline fontSize={15} />
              Lessons
            </Link>
            <Link
              to={homeworkPath}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <IoArrowForwardOutline fontSize={15} />
              Homework
            </Link>

          </Stack>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

AccordionHeader.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  lessonPath: PropTypes.string.isRequired,
  homeworkPath: PropTypes.string.isRequired,
};
export default AccordionHeader;
