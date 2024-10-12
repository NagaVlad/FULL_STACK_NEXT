import CustomHead from '@/components/Head'
import { Typography } from '@mui/material'

export default function About() {

  return (
    <>
      <CustomHead title='About Page' description='This is About Page' />
      <Typography variant='h4' textAlign='center' py={2}>
        About
      </Typography>
      <Typography variant='body1'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus,
        obcaecati necessitatibus! Doloremque numquam magni culpa atque omnis
        ipsa sequi, nostrum, provident repudiandae sint aperiam temporibus nulla
        minima quas rem ex autem dolores consequuntur! Officia laborum autem ex
        eius cumque non aspernatur blanditiis commodi quae magnam ipsa qui sunt
        dolor quos dolorum eveniet, nobis excepturi voluptatum quasi, dicta sit
        aut, corporis hic. Magni numquam, accusamus, quasi consectetur facere
        quod consequuntur aliquid illo commodi ducimus id tenetur ea molestiae
        suscipit itaque assumenda ex. Expedita rem architecto itaque, ad
        voluptate nesciunt nisi veniam modi cupiditate, amet id velit deserunt
        soluta? Ex, voluptate libero. Lorem test!
      </Typography>
    </>
  )
}