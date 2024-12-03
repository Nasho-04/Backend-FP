import transporter from "../config/transpoter.js"

const sendMail = async (options) => {
    return await transporter.sendMail({
        from: 'Ecommerce',
        to: options.to,
        subject: options.subject,
        html: options.html
    })
}

export default sendMail