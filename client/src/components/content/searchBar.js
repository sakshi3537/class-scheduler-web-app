import React,{useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { useDispatch } from 'react-redux';
import { searchUser} from '../../actions/userActions'
import { CLEAR_SEARCH_RESULTS } from '../../constants/constants';

const Searchbar = ({searchQuery,setSearchQuery}) => {
    const dispatch = useDispatch();
    const handleClearClick = () =>{
        setSearchQuery('');
        dispatch({type:CLEAR_SEARCH_RESULTS,payload:''});
    }
    const handleSubmit = () =>{
    dispatch(searchUser(searchQuery));
    };
    return(

        <Form onSubmit = {handleSubmit}>
        <Form.Field >
            <Form.Input type="text" label="Search Users" required name="s" placeholder='Search...' style={{width: "80%" }} onChange = {(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
        </Form.Field>
        <Button style={{marginBottom:"4%",backgroundColor:"blue",color:"white"}} type="submit">Search</Button>
        <Button style={{marginBottom:"4%",backgroundColor:"red",color:"white"}} onClick={handleClearClick}>Clear</Button>
        </Form>
    );
};

export default Searchbar;