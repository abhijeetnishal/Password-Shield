import githubIcon from '../../public/assets/github-logo.png'
import linkedinIcon from '../../public/assets/linkedin.png'
import Image from 'next/image'

const Footer = () => {
  return ( 
    <div data-testid="footer" className=' flex flex-row items-center justify-center h-16'>
      <a data-testid="github-link" id="github-link" className='mx-4' href='https://github.com/abhijeetnishal'>
        <Image className='' height={24} width={24} src={githubIcon} alt='github link' />
      </a>
      <a data-testid="linkedin-link" id="linkedin-link" className='mx-4' href='https://www.linkedin.com/in/abhijeetkumar7565/'>
        <Image className='' height={24} width={24} src={linkedinIcon} alt='linkedin link' />
      </a>
    </div>
  )
}

export default Footer