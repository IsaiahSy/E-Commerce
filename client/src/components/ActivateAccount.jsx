import React, { useEffect } from "react";

import { SIGN_IN } from "../constants"

import { verifyUserAccount } from '../api';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ActivateAccount = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const { data } = await verifyUserAccount(id);
                dispatch({ type: SIGN_IN, payload: data });
                navigate('/');
                window.location.reload();
            } catch (err) {
                navigate('/');
            }
        }

        verifyAccount();
    }, []);

    return (
        null
    );
}

export default ActivateAccount;