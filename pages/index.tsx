// import Link from 'next/link';
import { type ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from 'types/index';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTheme from 'hooks/useTheme';
import env from '@/lib/env';
import { Hero } from '@/components/landingpage/Hero';
import Integration from '@/components/landingpage/integration';
import Phone from '@/components/ui/phone';
import Opportunity from '@/components/landingpage/opportunity';
import PromoCard from "@/components/landingpage/Promocard"
import Testimonials from '@/components/landingpage/testimonials';
import Cta from '@/components/landingpage/cta';
import FloatingNavbar from '@/components/ui/navbar';
// import Footer from '@/components/landingpage/footer';

const Home: NextPageWithLayout = () => {
  // const { toggleTheme, selectedTheme } = useTheme();
  // const { t } = useTranslation('common');

  return (
    <>
      <div className="">
        <FloatingNavbar/>
        <Hero/>
        <Integration />
        <Phone/>
      <Opportunity/>
      <div className="mx-16 my-20">
        <PromoCard/>
        </div>
        <Testimonials />
        <Cta />
        {/* <Footer/> */}
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Redirect to login page if landing page is disabled
  if (env.hideLandingPage) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};


Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
