'use client'
import CountUp from 'react-countup';

const AnimatedCounter = (props: animatedCounterProps) => {
    const {amount, decimals = 0} = props;

  return (
    <>
        $<CountUp start={0} end={amount} delay={1} decimals={decimals}/>
    </>
  )
}

export default AnimatedCounter;
