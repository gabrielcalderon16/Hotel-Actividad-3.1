import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HotelApi } from '../api/api'
import { useForm } from '../hooks/useForm'
import { Grid } from '@mui/material';

const MySwal = withReactContent(Swal)

const formData = {
  titulo:'',
  descripcion:'',
  autor:'',

}

const FormValidations = {
    titulo: [( value ) => value.length > 0, 'El titulo es obligatorio'],
    descripcion: [( value ) => value.length > 0, 'El descripcion es obligatorio'],
    autor: [( value ) => value.length > 0, 'El autor es obligatorio']
  };
  

export const ModalEdit = ({openModal, handleClose, posts , getPosts}) => {

    const [FormSubmitted, setFormSubmitted] = useState(false)


  const { titulo, descripcion , autor ,  tituloValid, descripcionValid,
    autorValid, onInputChange, formState:FormEditPosts,
    formStateValid:FormEditPostsValid, onResetForm } = useForm (posts ? posts : formData, FormValidations)

    const onSubmit= async (event) => {
        event.preventDefault(); 
        setFormSubmitted(true)
  
        if(!FormEditPostsValid) return
        if(posts){
          const resp = await HotelApi.put(`/posts/${posts.uid}`, FormEditPosts)
          .then(resp => {
              close()
              getPosts()
              MySwal.fire({
                  title: 'Editar Posts',
                  text: 'Edicion realizada correctamente',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                })
          })
          .catch(
              error => {
            setFormSubmitted(false)
                  MySwal.fire({
                      icon: 'error',
                      title: 'Ups...',
                      text: error.response.data.msg,
                      confirmButtonText: 'Ok',
                    })
              }
          )
        } else {
          const resp = await HotelApi.post(`/posts`, FormEditPosts)
          .then(resp => {
              close()
              getPosts()
              MySwal.fire({
                  title: 'Crear Posts',
                  text: 'Creacion de nuevo posts realizada correctamente',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                })
          })
          .catch(
              error => {
            setFormSubmitted(false)
                  MySwal.fire({
                      icon: 'error',
                      title: 'Ups...',
                      text: error.response.data.msg,
                      confirmButtonText: 'Ok',
                    })
              }
          )
        }
       
    }

    const onCLose = ()=> {
        return true
      }

      const close = () => {
        handleClose()
        onResetForm()
        setFormSubmitted(false)
      }

  return (
    <>
     <Dialog open={openModal} onClose={onCLose}>
         <DialogTitle>
          Editar usuario
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            Edita la información del usuario seleccionado
            </DialogContentText>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Tituli" type="text" placeholder="titulo" value={titulo} name="titulo" error={!!tituloValid && FormSubmitted } helperText={ !!tituloValid && FormSubmitted  ? tituloValid : ''} onChange={onInputChange} fullWidth/>
                </Grid>

                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Descripcion" type="text"  multiline
          maxRows={10} placeholder="descripcion" value={descripcion} name="descripcion" error={!!descripcionValid && FormSubmitted } helperText={ !!descripcionValid && FormSubmitted  ? descripcionValid : ''} onChange={onInputChange} fullWidth/>
                </Grid>

                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Autor" type="text" placeholder="autor" value={autor} name="autor" error={!!autorValid && FormSubmitted } helperText={ !!autorValid && FormSubmitted  ? autorValid : ''} onChange={onInputChange} fullWidth/>
                </Grid>
                
            </Grid>
            </form>
         </DialogContent>

            <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <Button onClick={onSubmit} >Guardar</Button>
        </DialogActions>
        </Dialog>
    </>
  )
}
