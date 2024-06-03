import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

const url = process.env.URL;

interface ResetPasswordEmailProps {
  username: string;
  resetToken: string;
}

export default function ResetPasswordEmail({
  username,
  resetToken,
}: ResetPasswordEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Password Reset Request</title>
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
      <Preview>Reset Your Password</Preview>
      <Section>
        <Row>
          <Heading
            as="h2"
            style={{ color: "#333", fontFamily: "Roboto, Verdana, sans-serif" }}
          >
            Hello {username},
          </Heading>
        </Row>
        <Row>
          <Text
            style={{
              color: "#555",
              fontFamily: "Roboto, Verdana, sans-serif",
              fontSize: "16px",
            }}
          >
            You are receiving this because you (or someone else) have requested
            the reset of the password for your account.
          </Text>
        </Row>
        <Row>
          <Text
            style={{
              color: "#555",
              fontFamily: "Roboto, Verdana, sans-serif",
              fontSize: "16px",
            }}
          >
            Please click on the following button to complete the process:
          </Text>
        </Row>
        <Row>
          <Button
            href={`${url}reset-password?resetToken=${resetToken}`}
            style={{
              backgroundColor: "#61dafb",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "5px",
              fontFamily: "Roboto, Verdana, sans-serif",
            }}
          >
            Reset Password
          </Button>
        </Row>
        <Row>
          <Text
            style={{
              color: "#777",
              fontFamily: "Roboto, Verdana, sans-serif",
              fontSize: "16px",
            }}
          >
            If you did not request this, please ignore this email and your
            password will remain unchanged.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
