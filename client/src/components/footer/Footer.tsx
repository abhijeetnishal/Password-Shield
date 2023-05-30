import styles from '../../styles/footer.module.css'
import githubIcon from '../../../public/github-logo.png'
import linkedinIcon from '../../../public/linkedin.png'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return ( 
    <div className={styles.footer}>
      <Link className={styles.githubLink} href='https://github.com/abhijeetnishal'>
        <Image className={styles.githubIcon} src={githubIcon} alt='' />
      </Link>
      <Link className={styles.linkedinLink} href='https://www.linkedin.com/in/abhijeetkumar7565/'>
        <Image className={styles.linkedinIcon} src={linkedinIcon} alt='' />
      </Link>
    </div>
  )
}

export default Footer