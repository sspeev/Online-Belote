import Button from './Button'
import Moon from '../../../assets/svgs/Moon.svg'
import MoonLight from '../../../assets/svgs/MoonLight.svg'
import User from '../../../assets/svgs/User.svg'
import UserLight from '../../../assets/svgs/UserLight.svg'
import imageDesktop from '../../../assets/common/HeroDesktop.png'
import imageMobile from '../../../assets/common/HeroMobile.jpg'
import { BtnShape } from '@/types/enums/btnShape'

type BackgroundProps = {
  blur: boolean
  buttons: boolean
}

export const Background = (props: BackgroundProps) => {
  return (
    <section className={'w-screen h-screen relative overflow-hidden'}>
      {props.blur ? (
        <>
          <img
            className="visible blur-lg h-screen relative overflow-hidden"
            alt="Image"
            src={imageDesktop}
          />
          <img
            className="visible blur-lg lg:invisible h-screen absolute top-0 left-0 overflow-hidden"
            alt="Image"
            src={imageMobile}
          />
        </>
      ) : (
        <>
          <img
            className="visible h-screen relative overflow-hidden"
            alt="Image"
            src={imageDesktop}
          />
          <img
            className="visible lg:invisible h-screen absolute top-0 left-0 overflow-hidden"
            alt="Image"
            src={imageMobile}
          />
        </>
      )}

      <section className={`${props.buttons ?  "visible" : "invisible"} flex flex-col justify-end gap-20 absolute top-10 left-[90%] lg:left-[97%] z-10 w-13  h-20`}>
        <Button
          liquid={true}
          path="/some/path"
          icon={Moon}
          iconLight={MoonLight}
          shape={BtnShape.CIRCULAR}
        />
        <Button
          liquid={true}
          path="/some/path"
          icon={User}
          iconLight={UserLight}
          shape={BtnShape.CIRCULAR}
        />
      </section>

      <div className="visible dark:invisible absolute top-px left-0 w-screen h-screen rotate-180 background " />
      <div className="invisible dark:visible absolute top-px left-0 w-screen h-screen rotate-180 background-dark" />
    </section>
  )
}
