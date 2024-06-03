import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section
        style={{
          fontFamily: "Roboto, Verdana, sans-serif",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #e1e1e1",
          borderRadius: "5px",
        }}
      >
        <Row>
          <Heading as="h2" style={{ color: "#333" }}>
            Hello {username},
          </Heading>
        </Row>
        <Row>
          <Text style={{ color: "#555", fontSize: "16px" }}>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row
          style={{
            padding: "15px",
            backgroundColor: "#eef6fc",
            borderRadius: "4px",
            borderLeft: "5px solid #2a9fd6",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <Text style={{ color: "#2a9fd6" }}>{otp}</Text>
        </Row>
        <Row>
          <Text style={{ color: "#777", fontSize: "16px" }}>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
