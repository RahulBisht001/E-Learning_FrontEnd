import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const PrivacyPolicy = () => {

    return (
        <Box margin="0 auto">
            <Heading fontSize={{ base: '12px', md: '14px' }} fontWeight="600" mb="4" className='defaultFontFamily'>
                Privacy Policy for unacademy.com
            </Heading>
            <Text fontSize={{ base: '10px', md: '12px' }} mb="4">
                If you require any more information or have any questions about our privacy policy, please feel free to contact us
                by email at support.unacademy@gmail.com.
            </Text>
            <Text fontSize={{ base: '10px', md: '12px' }} mb="4">
                At unacademy.com we consider the privacy of our visitors to be extremely important. This privacy policy document
                describes in detail the types of personal information is collected and recorded by unacademy.com and how we use
                it.
            </Text>
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Log Files</b>
                <br /> Like many other Web sites, unacademy.com makes use of log files. These files merely logs visitors to the
                site – usually a standard procedure for hosting companies and a part of hosting services' analytics. The
                information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service
                Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. This information is
                used to analyze trends, administer the site, track user's movement around the site, and gather demographic
                information. IP addresses, and other such information are not linked to any information that is personally
                identifiable.
            </Text>
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Cookies and Web Beacons</b>
                <br /> unacademy.com uses cookies to store information about visitors' preferences, to record user-specific
                information on which pages the site visitor accesses or visits, and to personalize or customize our web page
                content based upon visitors' browser type or other information that the visitor sends via their browser.
            </Text>
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Additional Terms and Conditions</b>
                <br />
                Here are some additional terms and conditions for using our premium features:
            </Text>
            <UnorderedList fontSize={{ base: '10px', md: '12px' }}>
                <ListItem>Access to premium courses requires a paid subscription.</ListItem>
                <ListItem>The premium subscription fee is non-refundable.</ListItem>
                <ListItem>Users are responsible for maintaining the confidentiality of their premium account credentials.</ListItem>
                <ListItem>Unacademy reserves the right to modify or discontinue premium features at any time.</ListItem>
                <ListItem>Any violation of our terms and conditions may result in the termination of the user's account.</ListItem>
                <ListItem>
                    By using our premium features, users agree to abide by the guidelines and policies set forth by unacademy.com.
                </ListItem>
            </UnorderedList>
            {/* Add more clauses and conditions here */}
            {/* Clause 1 */}
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Data Collection</b>
                <br />
                We may collect personal information from users, such as names, email addresses, and contact details, for the
                purpose of providing our online courses and premium services. We only collect information that is voluntarily
                provided by users and ensure its confidentiality and secure storage.
            </Text>
            {/* Clause 2 */}
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Data Sharing</b>
                <br />
                We may share your information with trusted partners who assist us in operating our website, conducting our
                business, or servicing you, as long as those parties agree to keep this information confidential.
            </Text>
            {/* Clause 3 */}
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Security Measures</b>
                <br />
                We take appropriate security measures to protect against unauthorized access, alteration, disclosure, or
                destruction of your personal information. However, we cannot guarantee the security of information transmitted
                over the internet or stored in our databases.
            </Text>
            {/* Clause 4 */}
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Third-Party Websites</b>
                <br />
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or the
                content of such websites. We encourage you to review the privacy policies of those third-party websites.
            </Text>
            {/* Clause 5 */}
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Children's Privacy</b>
                <br />
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information
                from children. If we discover that a child under the age of 13 has provided us with personal information, we
                will promptly delete it from our systems.
            </Text>
            {/* Clause 6 */}
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Changes to Privacy Policy</b>
                <br />
                We reserve the right to update or change our privacy policy at any time. Any changes will be posted on this page,
                and the date of the last update will be indicated at the top of the policy.
            </Text>
            {/* Add more clauses and conditions here */}
            {/* Clause 7 */}
            <Text fontSize={{ base: '10px', md: '12px' }}>
                <b>Contact Information</b>
                <br />
                If you have any questions or concerns regarding our privacy policy, please contact us at support.unacademy@gmail.com.
            </Text>
        </Box>
    );
};

export default PrivacyPolicy;
