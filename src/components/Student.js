import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";
import { toast } from "react-toastify";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Student() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [student, setStudent] = useState([]);
    const [studentId, setStudentId] = useState('');

    const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
    const classes = useStyles();

    const clickHandler = (e) =>{
        e.preventDefault();
        const student = {name, address}
        // console.log(student);
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            toast.success("Student added successful...");
            getStudents();
        })
    }

    useEffect(()=>{
      getStudents();
    },[])

    const getStudents = ()=> {
      fetch("http://localhost:8080/student/getAll")
      .then(res=>res.json())
      .then((result)=>{
        setStudent(result);
      })
    }

    const deleteStudent = (id)=>{
      fetch(`http://localhost:8080/student/deleteStudent/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
      })
      .then((result)=>{
        toast.warning("Student deleted successful...");
        getStudents();
      });
    }

    const selectStudent = (id) =>{
      for(var i=0; i<student.length; i++){
        if(student[i].id === id){
          let item = student[i];
          setName(item.name);
          setAddress(item.address);
          setStudentId(item.id);
        }
      }
    }

    const updateStudent = () =>{
      let item = { name, address, studentId }
      fetch(`http://localhost:8080/student/updateStudent/${studentId}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(item)
      })
      .then((result)=>{
        toast.success("Student updated successful...");
        getStudents();
      });
    }

    const clearField = () =>{
      setName('');
      setAddress('');
    }

    return (
      <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:'blue'}}><ul>Add Student</ul></h1>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Student name" variant="outlined" fullWidth 
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth 
            value={address} onChange={(e)=>setAddress(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={clickHandler}>Submit</Button>
            <Button variant="contained" color="secondary" onClick={updateStudent}>Update</Button>
            <Button variant="contained" color="secondary" onClick={clearField}>Clear</Button>
          </form>
        </Paper>

        <h1>Students</h1>
        
        <Paper elevation={3} style={paperStyle}>
            {student.map((student)=>(
                <Paper elevation={6} style={{margin:'10px', padding:'15px', textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center'}} key={student.id}>
                    Id:{student.id}<br/>
                    Name:{student.name}<br/>
                    Address:{student.address}
                    <div>
                      <Button variant="contained" color="secondary" style={{height:"40px", marginRight:"10px"}}
                      onClick={()=>selectStudent(student.id)}
                      >Update</Button>
                      <Button variant="contained" color="secondary" style={{height:"40px"}} 
                      onClick={()=>deleteStudent(student.id)}>Delete</Button>
                    </div>
                </Paper>
                ))
            }
        </Paper>
      </Container>
    );
}
