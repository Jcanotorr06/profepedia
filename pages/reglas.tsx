import { NextPage } from "next"
import Head from "next/head";
import { useIntl } from 'react-intl';


const Reglas:NextPage = () => {
  const intl = useIntl()
  return (
    <>
      <Head>
        <title>{intl.formatMessage({id: 'community_guidelines'})} | Profepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-full flex flex-col gap-5">
        <h1 className="text-3xl font-medium">Profepedia Community Guidelines</h1>
        <article className="surface px-6 py-8 rounded-lg shadow-md text-xs md:text-sm lg:text-base">
          <p>Version 1.0</p>
          <p>
            These are the official posting guidelines (&quot;Site Guidelines&quot;) for www.profepedia.xyz website, application or other interactive service (&quot;Site&quot;). 
            These Site Guidelines are a part of, and an Additional Terms under, our Terms of Use Agreement.<br/>
            Profepedia is the largest online destination for students to do research and rate professors across Panama. Our mission is to provide a safe forum to share classroom experiences to help fellow students make critical education choices.<br/><br />
            <b className="text-sm md:text:base lg:text-lg font-semibold">The Site/App</b><br/>
            The Profepedia website (www.profepedia.xyz) provides user ghenerated feedback on professor&apos;s teaching methods and their respective coruses.<br/>
            Professors ratings should only be posted by users who have taken a class from the professor or who are currently taking a class with the professor.
            For each course a professor teaches, users are limited to posting one (1) comment. <br/>
            Profepedia is NOT the place to report dangerous, illegal or illitict behaviors. If you believe that you, another professor or a student is in danger, we strongly advise you to report such incidences directly to your campus authorirties or local law enforcement.<br/><br />
            <b className="text-sm md:text:base lg:text-lg font-semibold">How We Work</b><br/>
            Profepedia has a team of moderators who read every rating submitted. We have defined site guidelines to help reiforce our mission and most importantly to ensure our decisions around moderation are 100% consistent, regarless of student or professor.<br/>
            Did we miss something? If you feel an inappropriate comment should be removed from the site, we want to know. You can flag a comment for re-review and it will inmediately be escalated to our moderators. Moderators will determine whether to remove the rating permanently or restore it tto the website. Our moderators will never edit a rating to make it comply or remove a rating simply because it is a low score or negative review.<br/><br/>
            <b className="text-sm md:text:base lg:text-lg font-semibold">Guidelines</b><br/>
            <b className="font-semibold">Student Guidelines</b>
            <ul className="list-disc pl-8">
              <li>Be honest in your reviews. You want to be able to trust these reviews when evaluating your course options, so we ask that to contribute in the same spirit.</li>
              <li>When you are reviewing a professor, it&apos;s often helpful to privide both pros and cons. This leads to much more credible and constructive feedback for your peers.</li>
              <li>Reviews should focus specifically on the course and your learning experience. Do not comment on a Professor&apos;s appearance, dress, age, gender or race.</li>
              <li>Avoid hearsay. We want you to share your individual experience and what you took away from the course. Don&apos;t speak on behalf of another, encourage others to submit their own reviews.</li>
              <li>This is not a forum for debate. Reviews that specifically reference another review will be removed. If you do not agreee with someone&apos;s individual experience, we encourage you to share your own.</li>
              <li>We understand that not all teachers are the perfect match for each individual learnign style. Tell us how he course or the professor wasn&apos;t the best for you on a way that helps others make their own decision.</li>
              <li>Reviews fueled by anger do not reflect well on the author and can be removed for violations such as profanity. Take a minute to step back and make sure your review will genuinely help others understand your experience.</li>
              <li>Profepedia reserves the right to remove any rating that does ot contain substantive comments.</li>
              <li>We only allow students to review a professor one time. Spamming or dogpilling an account wil lead to comment removal and the account being locked on the site.</li>
              <li>When reading your fellow students reviews, we encourage you to use your discretion and weigh every review amongst the others. Online reviews should be one of the many resources used when making a decision that affects your academic future.</li>
            </ul><br/>
            <b className="font-semibold">Prohibited Content</b>: Comments that containt the following will be removed:
            <ul className="list-disc pl-8">
              <li>Profanity, name-calling, and/or vulgarity, derogatory remarks about religion, ethnicity, race, gender, physical appearance, age, mental and/or physical disabilites.</li>
              <li>Identifiable information about a professor or student that would allow someone to contact the professor or student outside of the university.</li>
              <li>References to a professor&apos;s or student&apos;s family, personal life and/or sex lfe, including sexual innuendos.</li>
              <li>Claims that the professor shows bias for or against a student or a specific group of students.</li>
              <li>Claims about a professor&apos;s employment status, including previous employment.</li>
              <li>Claims that a professor or student engages or has engaged in ilegal activities.</li>
              <li>Accusation that the professor is rating him/herself or his/her colleagues.</li>
              <li>Hyperlinks and/or URLs.</li>
            </ul><br />
            <b className="font-semibold">Professor Guidelines</b>
            <ul className="list-disc pl-8">
              <li>This is an anonymous website where students can share their classroom experiences. We are unable to provide any data or personal information about the submiter of a review.</li>
              <li>We are unable to remove a comment simply because it is negative. It will only be removed if it does&apos;t comply with our site guidelines</li>
              <li>We periodically update our professor database every semester. This data is sourced directly from public universities websites.</li>
              <li>Profepedia&apos;s moderation team is unable to prove or disprove details mentioned in a reveiw. We are not arbiters of fact. If you disagree with the details mentioned in a review you may report it, but it will only be removed if it violates our site guidelines.</li>
              <li>If you believe that your profile is being spammed or dogpiled, please contact us. We&apos;re happy to help and will happily review the comments in question.</li>
              <li>While it is against our guidelines for a professor to rate themselves, we recommend for professors to encourage their students to provide ratings each semester. The more reviews you have, the more representative they will be.</li>
            </ul><br/><br/>
            <b className="text-sm md:text:base lg:text-lg font-semibold">Flagging a Rating</b><br/>
            If you see a rating that you believe violates these Site Guideliens, please click the flag at the bottom of the comment to report it. Such comments will be evaluated by our personnel. Please do not flag a rating just because you disagree with it. <br/><br/>
            <b className="text-sm md:text:base lg:text-lg font-semibold">Reservation of Rights</b><br/>
            Profepedia reserves the right to remove any comments deemed as inappropriate, libelous, defamatory, indecent, vulgar or obscene, pornographic, sexcually explicit or sexually suggestive, racially, culturally, or ethnically offensive, harmful, harassing, intimidating, threatening, hateful, objectionable, discriminatory, or abusive, or which may or may not appear to impersinae anyone else or that otherwise violate the Terms of Use Agreement.<br/>
            The Sie reserves the right to remove, provide authorities or otherwise take appropiae action regarding comments that threaten violence or bodily harm to another user or professor including but not limited to, notifying the authorities of your IP address, where available, and the time you rated and takig any actions necessary.
          </p>
        </article>
      </main>
    </>
  )
}

export default Reglas