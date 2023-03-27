import Link from "next/link";
import classes from "./WarningModal.module.scss";
import { ButtonElement } from "@/interfaces/buttonElement";
import { useState } from "react";

export interface WarningModalProps {
    isOpen: boolean;
    message: string,
    confirmButtons: ButtonElement[]
    declineButtons: ButtonElement[]
}

const WarningModal = (props: WarningModalProps) => {
    const [isUsed, setIsUsed] = useState(false);

    return <div className={[classes.modal, props.isOpen ? undefined : classes.modal_hide].join(" ")}>
        <p className={classes.modal__message}>{props.message}</p>
        <div className={classes.modal__buttons}>
            {props.confirmButtons.map(button=>{
                return (
                <button 
                    onClick={()=>button.callback()}
                    className={classes.modal__buttons_confirm}
                >
                    {button.title}
                </button>
                );
            })}
            {props.declineButtons.map(button=>{
                return (
                <button 
                    onClick={()=>button.callback()}
                    className={classes.modal__buttons_decline}
                >
                    {button.title}
                </button>
                );
            })}
        </div>
    </div>

};

export default WarningModal;
