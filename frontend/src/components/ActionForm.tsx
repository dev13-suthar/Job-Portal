import { useNavigate } from 'react-router-dom'
import { Formik, FormikHelpers } from 'formik';
import { Button } from './ui/button';
import { BACKEND_URL } from '@/constants';

type registerProps = {
    email:string,
    password:string,
    phone:string,
    name:string,
    role:string
}

const ActionForm = () => {
    const navigate = useNavigate();
    const registerFunc = async(values:registerProps)=>{
        const res = await fetch(`${BACKEND_URL}/api/v1/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
        });
        const data = await res.json();
        console.log(data);
        if(res.ok){
            navigate("/signin")
        }
    }
    const handleFormSubmit = async(values:registerProps,helper:FormikHelpers<registerProps>)=>{
            await registerFunc(values);
            helper.resetForm();
    }

  return (
    <div className='flex flex-col gap-3 items-center w-[50%]'>
        <p className='text-4xl font-semibold'><span role="button" onClick={()=>{
            navigate("/")    
        }}>&larr; </span>Welcome,Register here</p>
        <span className='text-gray-500' onClick={()=>navigate("/signin")}>Already have account? login</span>
        <Formik 
        initialValues={{
            email:"",
            password:"",
            phone:"",
            name:"",
            role:"User"
        }}
        onSubmit={handleFormSubmit}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
        })=>(
            <form action="" className='flex flex-col gap-4 items-center mt-3 w-[50%]' onSubmit={handleSubmit}>
            <input 
            type="text" 
            className='p-3 rounded-xl w-full border-none text-stone-900 focus:ring-2 focus:ring-orange-700 focus:ring-offset-4 focus:outline-none ' 
            placeholder='Enter Email'
            name='email'
            value={values.email}
            onChange={handleChange}
            />{errors.email && touched.email && errors.email}
            <input 
            type="text" 
            className='p-3 rounded-xl w-full border-none text-stone-900 focus:ring-2 focus:ring-orange-700 focus:ring-offset-4 focus:outline-none' 
            placeholder='Enter Name'
            name='name'
            value={values.name}
            onChange={handleChange}
            />{errors.name && touched.name && errors.name}
            <input 
            type="text" 
            className='p-3 rounded-xl w-full border-none text-stone-900 focus:ring-2 focus:ring-orange-700 focus:ring-offset-4 focus:outline-none' 
            placeholder='Enter Password'
            name='password'
            value={values.password}
            onChange={handleChange}
            />{errors.password && touched.password && errors.password}
            <input 
            type="text" 
            className='p-3 rounded-xl w-full border-none text-stone-900 focus:ring-2 focus:ring-orange-700 focus:ring-offset-4 focus:outline-none' 
            placeholder='Enter Phone'
            name='phone'
            value={values.phone}
            onChange={handleChange}
            />{errors.phone && touched.phone && errors.phone}
            <select className='w-full rounded-md text-stone-800 p-2' value={values.role} name='role' onChange={handleChange}>
                <option value="User">Looking for Job</option>
                <option value="Employee">Hiring people for Jobs</option>
            </select>
            <Button className='rounded-2xl w-full'>{isSubmitting?"Registering...":"Register"}</Button>
            </form> 
        )}
        </Formik>
    </div>
  )
}

export default ActionForm

