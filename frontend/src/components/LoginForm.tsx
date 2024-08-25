import { Formik } from "formik";
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button";
import { loginUser } from "@/hooks/login";


export type loginProps = {
    email:string,
    password:string
}

const LoginForm = () => {
    const navigate = useNavigate();
    const handleFormSUbmit = async(values:loginProps)=>{
        await loginUser(values,navigate);
    }
  return (
    <div className="flex flex-col gap-3 items-center w-[50%]">
        <p className='text-4xl font-semibold'><span role="button" onClick={()=>{
            navigate("/")    
        }}>&larr; </span>Welcome,Login here</p>
        <span className='text-gray-500' onClick={()=>navigate("/signup")}>New here? signup</span>
    <Formik
    initialValues={{
        email:"",
        password:""
    }}
    onSubmit={handleFormSUbmit}
    >
        {({
             values,
             errors,
             touched,
             handleChange,
             handleSubmit,
             isSubmitting,
        })=>(
            <form className="flex flex-col gap-4 items-center mt-3 w-[50%]" onSubmit={handleSubmit}>
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
                placeholder='Enter Password'
                name='password'
                value={values.password}
                onChange={handleChange}
                />{errors.password && touched.password && errors.password}
                <Button className='rounded-2xl w-full'>{isSubmitting?"Login.....":"Login"}</Button>
            </form>
        )}
    </Formik>
    </div>
  )
}

export default LoginForm