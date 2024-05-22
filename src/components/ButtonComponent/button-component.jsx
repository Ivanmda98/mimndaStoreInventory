
import { useEffect, useRef, useState } from 'react';
import './button-component.css';
import { IoIosAdd, IoMdSearch } from "react-icons/io";
import { MdEdit, MdDelete, MdFileDownloadDone, MdCancel } from "react-icons/md";
function ButtonComponent({action, showFormToAddProduct, addNewProduct, cancelFunction, searchProduct,getProductById, updateProduct, method, deleteProduct}){
    const toLowerCaseFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toLowerCase() + str.slice(1);
    };
    const buttonRef = useRef(null);
    const [actionToDo, setActionToDo] = useState('');
    const iconsMap = {
        create: <IoIosAdd/>,
        update: <MdEdit/>,
        delete: <MdDelete/>,
        search: <IoMdSearch/>,
        save: <MdFileDownloadDone />,
        cancel: <MdCancel/>
    }
    const actionsMap = {
        create: 'Add product',
        update: 'Edit',
        delete: 'Delete',
        search: 'Search',
        save: 'Save',
        cancel: 'Cancel'
    }
    const icon = iconsMap[toLowerCaseFirstLetter(action)];
    const valueAction = actionsMap[toLowerCaseFirstLetter(action)];

    const handleClick = (e) => {
        const clickedElement = e.currentTarget.dataset.action;
        setActionToDo(clickedElement);
    }

    useEffect(() => {
        if(actionToDo === 'create'){
            showFormToAddProduct();
        }else if(actionToDo === 'save'){
            method === 'post'?
                addNewProduct()
                : updateProduct();
        }else if(actionToDo === 'cancel'){
            cancelFunction();
        }else if(actionToDo === 'search'){
            searchProduct();
        }else if(actionToDo === 'update'){
            getProductById();
        }else if(actionToDo === 'delete'){
            deleteProduct();
        }
        setActionToDo('')
    },[actionToDo])
    return (
            <div className={`btn-${toLowerCaseFirstLetter(action)} btn`} 
            ref={buttonRef} 
            onClick={(e) => handleClick(e)}
            data-action={toLowerCaseFirstLetter(action)}>
                {icon && icon}
                <p>{valueAction}</p>
            </div>
        
    )
}
export default ButtonComponent