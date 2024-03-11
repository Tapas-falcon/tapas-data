import React, {Component, JSX} from 'react'
import Modal from '@mui/joy/Modal';
//import ReactDOM from 'react-dom';
import ModalDialog, {ModalDialogProps} from '@mui/joy/ModalDialog';
import {ModalTypeMap} from "@mui/joy/Modal/ModalProps";
import {BaseModalProps} from "@/components/base/types";
import {Box, Button} from "@mui/joy";
import ReactDOM from "react-dom/client";
import services from "@/utils/services";
export default class BaseModal extends Component<BaseModalProps>{
    static open(props:BaseModalProps){
        return new Promise((resolve, reject)=>{
            services.open(BaseModal,{
                ref:(modalRef:any)=>{
                        if(modalRef){
                            (modalRef as BaseModal).show();
                            resolve(modalRef);
                        }
                    },
                ...props
            })
        })
    }
    state={
        visible:false,
        okLoading:false,
        cancelLoading:false
    };
    async  onCancel(){
        let {onCancel}=this.props;
        this.setState({cancelLoading:true})
        let result=onCancel&&await onCancel(this);
        this.setState({cancelLoading:false})
        if(!result){
            this.hide();
        }
    }
    async onOk(){
        let {onOk}=this.props;
        this.setState({okLoading:true})
        let result=onOk&&await onOk(this);
        this.setState({okLoading:false})
        if(!result){
            this.hide();
        }
    }
    contenter:any;
    show(){
        this.setState({visible:true},()=>{
            this.props.onShow&&this.props.onShow();
        });

    }
    hide(){
        this.setState({visible:false},()=>{
            this.props.onHide&&this.props.onHide();
            let {root}=this.props;
            //为防止警告 再下一帧进行卸载
            requestAnimationFrame(()=>root&&root.unmount());
        });
    }
    setContentRef(ref:any,key:string){
        if(!ref)return;
        if(ref!==this.contenter){
            this.contenter=ref;
            this.forceUpdate();
        }
    }
    getContentRef(){
        return this.contenter;
    }

    render() {
        let {visible,okLoading,cancelLoading}=this.state;
        let {children:Children,childrenProps={},modalProps={},modalDialogProps={},modalBoxClass,modalBoxContentClass,textCancel,textOk,footer,hiddenCancel,hiddenOk}=this.props;

        return  (
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={visible}
            onClose={() => this.hide()}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            {...modalProps}
          >
              <ModalDialog
                sx={{
                    borderRadius: `var(--radius-radius-rounded, 0.75rem)`,
                    background: 'var(--surface-sf-wht, #FFF)',
                    '--Card-padding': '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    width: '45rem',
                    height:"34rem"
                }}
                className={'p-0'}
                {...modalDialogProps}
              >
                  <Box className={`${modalBoxClass||""}`}>
                      <Box className={`${modalBoxContentClass||''} p-4`}>
                          {(Children as any) instanceof Function? <Children  ref={(ref:any)=>this.setContentRef(ref,'contenter')} modal={this} {...childrenProps}/>:Children}
                      </Box>
                      <Box className={`footer-dialog flex row justify-end items-center p-4 border-solid border-0  border-t border-gray-100`}>
                          {
                              footer?footer:(
                                <>
                                    {
                                      !hiddenCancel&&(
                                        <Button
                                          variant="plain"
                                          color="neutral"
                                          className="rounded-[360px] h-10 min-w-20"
                                          loading={cancelLoading}
                                          onClick={() => this.onCancel()}
                                        >{textCancel||'Cancel'}</Button>
                                      )
                                    }
                                    {
                                        !hiddenOk&&(
                                        <Button
                                          variant="solid"
                                          color="neutral"
                                          className="rounded-[360px] h-10 min-w-20"
                                          loading={okLoading}
                                          onClick={() => this.onOk()}
                                        >{textOk||'Ok'}</Button>
                                      )
                                    }
                                </>
                              )
                          }
                      </Box>
                  </Box>
              </ModalDialog>
          </Modal>
        )
    }
}
