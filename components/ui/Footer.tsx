
const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const { email, name = '', firstName } = user;
  return (
    <footer className="footer">
      <div className={type === 'desktop' ? 'footer_name' : 'footer_name-mobile'}>
        <p className="text-xl font-bold text-gray-700">
          {name[0]}
        </p>
      </div>
    </footer>
  )
}

export default Footer