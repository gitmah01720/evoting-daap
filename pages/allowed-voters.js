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



const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null); // image
  const [fileimg, setFileimg] = useState([]);

  const [formInput, setFormInput] = useState({
    name:"",
    address:"",
    position:"",
  }); 

  const router  = useRouter();
  const {uploadToIPFS, createVoter} = useContext(VotingContext);

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


console.log('fileUrl = ', fileUrl)
  // returning data. with jsx if user uploads image



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
            Pos: <span>&nbps; {formInput.position}</span>
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
              {/* {voterArray.map((el,i)=> (
                <div key = {i+1} className = {Style.card_box}>
                  <div className = {Style.image}>
                  <img src = {fileUrl} alt = "Profile Image" />
                  </div>

                  <div className = {Style.card_info}>
                    <p>Name</p>
                    <p>Address</p>
                    <p>Details</p>
                  </div>
                </div>
              ))} */}
          </div>
        </div>   
      )}
    </div>
    
    <div className  = {Style.voter}>
      <div className= {Style.voter__container}>
        <h1>Create New Voter</h1>
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
      <Input inputType="text" title="Name" placeholder = "Voter Name"
        handleClick={(e) => 
          setFormInput({...formInput, name: e.target.value})
        }
        />
      <Input inputType="text" title="Address" placeholder = "Voter Address"
        handleClick={(e) => 
          setFormInput({...formInput, address: e.target.value})
        }
        />
      <Input inputType="text" title="Position" placeholder = "Voter Positions"
        handleClick={(e) => 
          setFormInput({...formInput, position: e.target.value})
        }
        />

      <div className={Style.Button}>
        <Button btnName="Autorise Voter" handleClick = {()=> createVoter(formInput,fileUrl,router)}/>
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

export default allowedVoters;

// got to : http://localhost:3000/allowed-voters