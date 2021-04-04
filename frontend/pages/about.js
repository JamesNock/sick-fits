import Link from 'next/link';
import styled from 'styled-components';

const AboutStyles = styled.div`
  a {
    text-decoration: underline;
  }
`;

export default function AboutPage() {
  return (
    <AboutStyles>
      <p>
        This is a demo build as a result of completing Wes Bos'{' '}
        <Link href="https://advancedreact.com/">Advanced React</Link> course.
      </p>
      <p>
        Whilst the course is complete, this is far from a 'finished' website.
      </p>
      <p>The website uses:</p>
      <ul>
        <li>
          <Link href="https://nextjs.org/">Next.js</Link> (
          <Link href="https://reactjs.org/">React</Link>)
        </li>
        <li>
          <Link href="https://www.apollographql.com/">Apollo</Link> for Data
          Management
        </li>
        <li>
          <Link href="https://www.keystonejs.com/">Keystone.js</Link> as a
          GraphQL Server &amp; Headless CMS
        </li>
      </ul>
    </AboutStyles>
  );
}
