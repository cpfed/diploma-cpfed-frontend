import Link from "next/link";
import classes from "./WarningModal.module.scss";
import { ButtonElement } from "@/interfaces/buttonElement";
import { useRef, useState } from "react";
import toast from "@/utils/toast";

interface WarningModalRules {
    text: string
    link?: string
}

export interface WarningModalProps {
    isOpen: boolean;
    message: string,
    confirmButtons: ButtonElement[]
    declineButtons: ButtonElement[]

    rules?: WarningModalRules[]
}

const WarningModal = (props: WarningModalProps) => {
    const inputRefs = props.rules?.map(rule=>useRef<HTMLInputElement>(null)) ?? [];

    return <div className={[classes.modal, props.isOpen ? undefined : classes.modal_hide].join(" ")}>
        <p className={classes.modal__message}>{props.message}</p>
        {props.rules?.map((rule, index)=>{
            return (
                <div key={index + props.confirmButtons.length + props.declineButtons.length} className={classes.modal__checkbox}>
                    <input ref={inputRefs[index]} type='checkbox' defaultChecked={false} title="Э"/>
                    <Link href={rule.link ?? "#"} target={"_blank"}>{rule.text}</Link>
                </div>
            )
        })}
        
        <div className={classes.modal__buttons}>
            {props.confirmButtons.map((button, index)=>{
                return (
                <button 
                    key={index}
                    onClick={()=>{
                        for(const input of inputRefs)
                        {
                            if(input.current?.checked === false)
                            {
                                toast.warn("Прими");
                                return;
                            }
                        }
                        button.callback()
                    }}
                    className={classes.modal__buttons_confirm}
                >
                    {button.title}
                </button>
                );
            })}
            {props.declineButtons.map((button, index)=>{
                return (
                <button 
                    key={index + props.confirmButtons.length}
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
