import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

// const handleChange = (event) => {

// };

export default function TaskItem(info) {
    return (
      <>
        <Item>
          <FormControlLabel
            control={<Checkbox />}
            label={info.info.title}
          />
        </Item>
      </>
    );
}