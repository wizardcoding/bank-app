'use client'
import CountUp from 'react-countup';

const AnimatedCounter = (props: animatedCounterProps) => {
    const {amount, decimals = 0, prefix = '$'} = props;

  return (
    <>
        <CountUp className="w-full"
          start={0}
          end={amount}
          decimal=','
          duration={2}
          prefix={prefix}
          delay={1}
          decimals={decimals}
        />
    </>
  )
}

export default AnimatedCounter;
