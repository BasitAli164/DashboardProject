import {Html,Head,Font, Preview,Row, Section, Text,Heading} from '@react-email/components';
interface VerificationEmailProps{
    userName:string,
    otp:string
}

export default  function VerificationEmail({userName,otp}:VerificationEmailProps){
    return(
        <>
        <Html>
            <Head>
                <title>Verification Code </title>
                <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url:'https://font.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1MmxKKTU1Kg.woff2',
                    format:'woff2'
                }}
                fontWeight={400}
                fontStyle="normal"
                />
            </Head>
            <Preview>Here &apos;s  your Verification code : {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hellow {userName}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you  for registering. Please use the  following Verification code to complete  your registration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>
                        If you did  not request  this code, please ignore  this email
                    </Text>
                </Row>
            </Section>
        </Html>
        </>
    )

}