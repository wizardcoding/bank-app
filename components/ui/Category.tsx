import { topCategoryStyles } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

const Category = ({ category }: CategoryProps) => {
    const { name = '', totalCount = 0 } = category;
    const categoryCount = category.count || 0;
    const { bg, icon, circleBg, text: {main, count}, progress: {progressBg, indicator} } = topCategoryStyles[name as keyof typeof topCategoryStyles] ||
        topCategoryStyles.default;

  return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
        <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
            <Image src={icon} width={20} height={20} alt={name}/>
        </figure>
        <div className='flex w-full flex-1 flex-col gap-2'>
            <div className='text-14 flex justify-between'>
                <h2 className={cn("font-medium text-nowrap max-w-16 overflow-x-clip text-ellipsis", main)}>
                    {name}
                </h2>
                {' : '}
                <h3 className={cn("font-medium mx-3 mr-3", count)}>
                    {categoryCount}
                </h3>
                <Progress
                    value={(categoryCount / totalCount) * 100}
                    className={cn("h-2 w-full mt-1", progressBg)}
                    // @ts-ignore
                    indicatorClassName={cn("h-2 w-full", indicator)}
                />
            </div>
        </div>
    </div>
  )
}

export default Category