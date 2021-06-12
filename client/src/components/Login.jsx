import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import '../App.css';
// import '../components/style.css'
import image from '../images/program2.png'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

let name, value
function Login() {
    const [btn_name,newName] =useState("Login")
    const [loading, setLoading] = useState(false)
    const [alert,setAlert] =useState(false)
    const [errmsg,setMsg] =useState("")
    const history= useHistory()
   
    const[user,setUser] = useState({
        email:"",
        password:""
    })

    function handleInputs(e)
    {
            name=  e.target.name;
            value= e.target.value;
            setUser({...user,[name]:value})
    }

       async function postData(e)
        {
        //    function spinner()
        //    {
            const btnleft = document.getElementById('btnleft1')
        //     const i= document.createElement('i')
        //     i.setAttribute("class","fas fa-sync-alt")
        //     i.setAttribute("id","spinner")
            //  btnleft.innerText="Loading.."
        //    }
        setLoading(true)
        
                const{email,password} = user;
            
                e.preventDefault();
                const responce =await fetch("/login" ,{
                                method:"POST",
                                headers:{
                                        "Content-Type":"application/json"
                                        },
                                        // converting JSON format into String brfore sending it to the server
                                body:JSON.stringify({
                                    email,password
                                        })
                                    
                                        
                            })
                           
                            const data = responce.json();
                            if(responce.status==304)
                            {
                                setMsg("Invalid Email or Password")
                                setLoading(false)
                            }
                            else if(responce.status===400 || !data)
                            {
                                
                                    // window.alert("invalid Login")
                                    // setInterval(()=>{
                                        setLoading(false)
                                    // },2000)
                                  setMsg("Invalid credentials")   
                                   
                            }
                            else{
                               
                               
                                setAlert(true)
                                // window.alert("reg success");
                                setTimeout(()=>{
                                    history.push("/landingpage")
                                },3000)
                            }
        }
  

    return (
        

    
        <form method="POST" className="signup_form mb-2">
        <div className="outer_cont mt-5 shadow-lg p-3 mb-5 bg-body rounded">
            <div className="left mx-3 my-2 ">
                    <div className="heading mb-5">
                        <h1>Login</h1>
                    </div>
                    <p className="lgn_errmsg">{errmsg}</p>
                    {/* inputs */}
                    
                    <div className="inputs2">
                        <i class="fas fa-envelope fa-2x"></i>
                        <input  className="form-contro mb-3" onChange={handleInputs} name="email" value={user.email} placeholder="Your Email"  type="email" />
                        {/* <input type="input" class="form__field" placeholder="Name" name="name" id='name' required /> */}
                       
                           
                        
                    </div>
                    
                    <div className="inputs4">
                        <i class="fas fa-key fa-2x"></i>
                        <input  className="form-contro mb-3" onChange={handleInputs} name="password" value={user.password} type="number" placeholder="Password" />
                    </div>
                   
                    {/* buttons */}
                    <div className="btns_grp">
                        <div className="Signup_btn">
                        <Link to="/signup"><button type="button" class="btn btn-primary mx-2 fw-bold px-4">Sign up</button></Link>
                        </div>
                        <div className="_btn">
                             <button type="button" id="btnleft1" onClick={postData} class="btn btn-success text-white fw-bold px-4">Login { loading  ? <i class="class fas fa-sync-alt" id="spinner" /> : null} </button>
                         
                        </div>
        </div>
                            {/* button ends */}
            </div>
            <div className="right mt-5">
                <div className="heading2 "> 
                </div>
                <div className="image_div">
                    <img className="m-0 img-fluid" src={image} width="300px" />
                </div>
            </div>
            
        </div>
        <hr />

        <div className="alert_box lgn_alert">
                    {alert ? <div class="alert alert-success fw-bold fs-5" role="alert">
                                   Login Successfull..!
                                 </div> : "" }
                    </div>
    </form>
    
    
    
    )
}

export default Login
