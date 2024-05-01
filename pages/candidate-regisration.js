import React , {useState,useEffect,useCallback,useContext} from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// internal imports:
import { VotingContext } from "../context/Voter";
import Style from "../styles/allowedVoter.module.css"
import images from "../assets"
import Button from "../components/Button/Button"
import Input from "../components/Input/Input"



const candidateRegistratin = () => {
  const [fileUrl, setFileUrl] = useState(null); // image
  const [fileimg, setFileimg] = useState([]);

  const [formInput, setFormInput] = useState({
    name:"",
    address:"",
    age:"",
  }); 

  const router  = useRouter();
  const {uploadToIPFS, createCandidate,candidateArray,getAllCandidatedata} = useContext(VotingContext);

  // voter image drop by user.
  const onDrop = useCallback(async (acceptedFil)=>{
    
    // const url = await uploadToIPFS(acceptedFil[0]);
    // console.log(acceptedFil[0]);
    // setFileimg(acceptedFil[0])
    // acceptedFil.forEach(file => {
    //   console.log("Filename = = ",file.name);
    // })
    
    const url = `http://localhost:8000/${acceptedFil[0].name}`;
    console.log("File Path => ",url);
    setFileUrl(url);
  });

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });


// console.log('fileUrl = ', fileUrl)
  // returning data. with jsx if user uploads image

  // taking data into the array.
  useEffect(() => {
    getAllCandidatedata();
    console.log(candidateArray);  
  }, [])
  

  return (
  <div className = {Style.createVoter}>
    <div>
      { fileUrl && (
        <div className = {Style.voterInfo}>
          <img src = {fileUrl} alt = "Voter Image" />
          <div className = {Style.voterInfo_paragraph}>
          <p>
            Name: <span>&nbps; {formInput.name}</span>
          </p>
          <p>
            Addr: <span>&nbps; {formInput.address.slice(0,20)}</span>
          </p>
          <p>
            Pos: <span>&nbps; {formInput.age}</span>
          </p>
          </div>
        </div>   
      )}
      { !fileUrl && (
        <div className = {Style.sideInfo}>
          <div className = {Style.sideInfo_box}>
          <h4>Candidate Data</h4>
          <p>
            ... Blockchain based voting platform.
          </p>
          
           <p className  = {Style.sideInfo_para}>
              Candidates..
           </p>
          </div>

          <div className = {Style.card}>
              {candidateArray.map((el,i)=> (
                <div key = {i+1} className = {Style.card_box}>
                  <div className = {Style.image}>
                  <img src = {el[1]} alt = "Profile Image" />
                  </div>

                  <div className = {Style.card_info}>
                    <p>{el[0]} #CID-{el[4].toNumber()}</p>
                    <p>Address: {el[6].slice(0,5)}...{el[6].slice(-3)}</p>
                    <p>Details: age = {el[3].toNumber()} |--| currentvotecount = {el[2].toNumber()} </p>
                  </div>
                </div>
              ))}
          </div>
        </div>   
      )}
    </div>
    
    <div className  = {Style.voter}>
      <div className= {Style.voter__container}>
        <h1>Create New Candidate</h1>
        <div className={Style.voter__container__box}>
          <div className = {Style.voter__container__box__div}>
            <div { ...getRootProps()}>
              <input{ ...getInputProps()}/>

              <div className = {Style.voter__container__box__div__info}>
                <p>upload File: JPG, PNG Max 10MB</p>
                <div className={Style.voter__container__box__div__image}>
                  <Image src={images.upload} 
                  width={150} 
                  height={150} 
                  objectFit="contain" 
                  alt="File Upload" 
                  />
                </div>
                <p>Drag & Drop the File</p>
                <p>OR click to browse</p>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className = {Style.input__container}>
      <Input inputType="text" title="Name" placeholder = "Candidate Name"
        handleClick={(e) => 
          setFormInput({...formInput, name: e.target.value})
        }
        />
      <Input inputType="text" title="Address" placeholder = "Candidate Address"
        handleClick={(e) => 
          setFormInput({...formInput, address: e.target.value})
        }
        />
      <Input inputType="text" title="age" placeholder = "Candidate Age"
        handleClick={(e) => 
          setFormInput({...formInput, age: e.target.value})
        }
        />

      <div className={Style.Button}>
        <Button btnName="Autorise Candidate" handleClick = {()=> createCandidate(formInput,fileUrl,router)}/>
      </div>
      </div>
    </div>
        {/* /////////////////////// */}
        <div className={Style.createdVoter}>
          <div className = {Style.createdVoter__info}>
            <Image src={images.creator} alt="user Profile"/>
            <p>Notice for user</p>
            <p>
              Organizer <span>0x939939..</span>
            </p>
            <p>Only Organizer of the voting contract can create voters</p>
          </div>
        </div>

  </div>
  );


};

export default candidateRegistratin;

// got to : http://localhost:3000/candidate-regisration