import { title } from "process";

const HeaderBox = (props: HeaderBoxProps) => {
    const { type = 'title', subtext, user, title } = props
  return (
    <div className="header-box">
        <h1 className="header-box-title">
            {title}
            {type === 'greeting' && (
                <span className="text-bankGradient">
                  &nbsp;{user}
                </span>
              )
            }
        </h1>
        <p className="header-box-subtext">{subtext}</p>
    </div>
  )
}

export default HeaderBox;
