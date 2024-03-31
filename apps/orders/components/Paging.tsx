import { DialButton } from "@tapas/ui/NumberKeyboard";
import { ChevronLeftIcon, ChevronRightIcon } from '@tapas/ui/icons';
import { ArrowDropDownIcon } from "@tapas/ui/icons";
import JoySelect, { selectClasses } from '@mui/joy/Select';
import JoyOption from '@mui/joy/Option';
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export interface IPagingProps {
    total: number;
    current: number; // 这是当前页码，从1开始
    onChange?: (page: number) => void;
    pageSize?: number;
    pageSizeChange?:(pageSize: number) => void;//页码回调
}

export const Paging: React.FC<IPagingProps> = ({
    total,
    current,
    onChange=() => {},
    pageSize=10,
    pageSizeChange=()=>{}
}) => {
    const t = useTranslations("common");
    const [_pageSize, set_pageSize] = useState(pageSize);
    const totalPage=Math.ceil(total/_pageSize);
    let firstPageNums=()=>{
        let arr=[];
        let max=totalPage>5?5:totalPage;
        for (let i=1;i<max+1;i++){
            arr.push(i.toString());
        }
        return arr;
    }
    let arr=firstPageNums();
    const [renderNums, setRenderNums] = useState(arr);
    // always show 5 numbers, the current number is in the middle

    useEffect(() => {
        if (current < 3) {
            // console.log(firstPageNums(),'current')

            setRenderNums(firstPageNums());
            return;
        }
        if (current > totalPage - 2) {
            let arr=[];
            for (let i=current-2;i<=totalPage;i++){
                arr.push(i)
            }
            setRenderNums(arr.map(val => val.toString()));
            return;
        }
        setRenderNums([current - 2, current - 1, current, current + 1, current + 2].map(val => val.toString()));
    }, [current,_pageSize,total]);

    const [leftEnable, setLeftEnable] = useState(false);
    const [rightEnable, setRightEnable] = useState(false);
    useEffect(() => {
        setLeftEnable(true);
        setRightEnable(true);
        if (current === 1) {
            setLeftEnable(false);
            return;
        }
        if (current === totalPage) {
            setRightEnable(false);
            return;
        }
    }, [current]);

    const onClickLeft = () => {
        if (leftEnable && current > 1) {
            onChange(current - 1);
        }
    }

    const onClickRight = () => {
        if (rightEnable && current < totalPage) {
            onChange(current + 1);
        }
    }

    const onClickNum = (num: number) => {
        onChange(num);
    }
    const onPageSizeChange= (num: number)=>{
        set_pageSize(num);
        pageSizeChange(num);
    }
    return (
        <div className="inline-flex flex-row justify-start items-center gap-2">
            <span className={`text-sm`} style={{color:"var(--joy-palette-neutral-540)"}}>{t("Total")}:{total}</span>
            <ChevronLeftIcon 
                className="cursor-pointer"
                color={leftEnable?'rgba(0,0,0,0.9)':'rgba(0,0,0,0.25)'} size={20}
                onClick={() => onClickLeft()}/>
            {
                renderNums.map(val => (
                    <DialButton key={`dial-${val}`} text={val}
                        className="w-8 h-8 text-black text-opacity-90 text-sm font-normal font-['Bricolage Grotesque']"
                        sx={{
                            '--Button-minHeight': '2rem'
                        }}
                        // variant={Math.random() > 0.5 ? 'soft' : 'plain'}
                        variant={current === parseInt(val) ? 'soft' : 'plain'}
                        onClick={() => onClickNum(parseInt(val))}
                    />
                ))
            }
            <ChevronRightIcon 
                className="cursor-pointer"
                color={rightEnable?'rgba(0,0,0,0.9)':'rgba(0,0,0,0.25)'} size={20} 
                onClick={() => onClickRight()}/>
            {/* 分隔符 */}
            <div className='w-px h-8 bg-black bg-opacity-[0.12]' />
            <JoySelect
                className="text-black text-opacity-90 text-sm font-normal font-['Bricolage Grotesque']"
                indicator={<ArrowDropDownIcon size={20} />}
                value={_pageSize}
                onChange={(ev,value)=>onPageSizeChange(value)}
                sx={{
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                    minWidth: '5rem',
                    '--variant-plainHoverColor': 'transparent',
                    '--variant-outlinedHoverBorder': 'transparent',
                    '--variant-outlinedBorder': 'transparent',
                    boxShadow: 'none',
                }}
            >
                {
                    // 生成分页器数据
                    [10,20,30,40,50].map(val => (
                        <JoyOption key={`joy-${val}`} value={val}>{val} / {t("page")}</JoyOption>
                    ))
                }
            </JoySelect>
        </div>
    )
}

export default Paging;
