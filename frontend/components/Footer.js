import Link from 'next/link';
import styled from 'styled-components';

const FooterStyles = styled.div`
  width: 100%;
  background: var(--red);
  color: var(--offWhite);
  font-size: 10px;
  text-align: center;
  padding: 1rem;
`;

export default function Footer() {
  return (
    <FooterStyles>
      <p>
        This is not a real store. <Link href="/about">More information</Link>.
      </p>
    </FooterStyles>
  );
}
