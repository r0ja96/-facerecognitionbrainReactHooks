import './ImageLinkForm';

const ImageLinkForm = ({onInputChange,onSubmit})=>{
    return(
        <div>
            <p>{'This Magic Will detect faces in your pictures. Git it a try'}</p>
            <div>
                <input type ='text' onChange ={onInputChange}/>
                <button onClick={onSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;