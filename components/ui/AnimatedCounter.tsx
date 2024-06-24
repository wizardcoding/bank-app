'use client'
import CountUp from 'react-countup';

const AnimatedCounter = ({amount} : {amount: number}) => {
  return (
    <>
        $<CountUp start={0} end={amount} delay={1} decimals={2}/>
    </>
  )
}

export default AnimatedCounter;
