import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import "./UserForm.css"
import {UserService} from "../../../service/UserService";
import {User} from "../../../model/User";
import Snackbar from "../../Snackbar/Snackbar";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const NAME_LASTNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function UserForm() {

    const [user, setUser] = useState<User>({
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    })
    const userService = new UserService()
    // email
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    // first name
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    // last name
    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    //password
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    //confirmation password
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidFirstName(NAME_LASTNAME_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_LASTNAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, firstName, lastName, pwd, matchPwd])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!EMAIL_REGEX.test(email) || !PWD_REGEX.test(pwd) || !NAME_LASTNAME_REGEX.test(firstName) || !NAME_LASTNAME_REGEX.test(lastName)) {
            setErrMsg("Invalid Entry");
            return;
        }
        userService.createUser(email, firstName, lastName, pwd).then((result) => {
            setUser(result as User)
            console.log(JSON.stringify(result))
            setSuccess(true);
            setEmail('');
            setLastName('');
            setFirstName('')
            setPwd('');
            setMatchPwd('');
        }).catch((error) => {
            setUser({
                id: 0,
                email: "",
                firstName: "",
                lastName: "",
                password: ""
            })
            setErrMsg(error)
        })
    }

    return (
        <>
            <div className={"content"}>
                {success ? (
                    <section className={"sec"}>
                        <h1 className={"titleRegistration"}>Successfully created User!</h1><br/>
                        <NavLink to={"/signIn"}>
                            <div className={"link"}>
                                Sign In
                            </div>
                        </NavLink>
                    </section>
                ) : (
                    <section className={"sec"}>
                        <h1 className={"titleRegistration"}>Registration</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                className={"input-user"}
                                placeholder={"Email"}
                                autoComplete="off"
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailNote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="emailNote"
                               className={emailFocus && email && !validEmail ? "valid" : "hidden"}>
                                Invalid email type<br/>
                                Email: aaaa@aaa.pl alike is required!
                            </p>

                            <input
                                className={"input-user"}
                                placeholder={"First Name"}
                                autoComplete="off"
                                type="text"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                                aria-invalid={validFirstName ? "false" : "true"}
                                aria-describedby="firstNameNote"
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                            />
                            <p id="firstNameNote"
                               className={firstNameFocus && firstName && !validFirstName ? "valid" : "hidden"}>
                                Required at least 4 characters!<br/>
                                No special chars or numbers are allowed!
                            </p>

                            <input
                                className={"input-user"}
                                placeholder={"Last Name"}
                                autoComplete="off"
                                type="text"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                                aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby="lastNameNote"
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                            />
                            <p id="lastNameNote"
                               className={lastNameFocus && lastName && !validLastName ? "valid" : "hidden"}>
                                Required at least 4 characters!<br/>
                                No special chars or numbers are allowed!
                            </p>

                            <input
                                className={"input-user"}
                                placeholder={"Password"}
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "valid" : "hidden"}>
                                Password must have 8 to 24 characters. Must include uppercase and lowercase letters,
                                number and special character.<br/>
                                Allowed special characters: ! # % @ $
                            </p>

                            <input
                                className={"input-user"}
                                placeholder={"Confirmation Password"}
                                type="password"
                                id="confirmationPwd"
                                autoComplete="off"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmationNote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmationNote" className={matchFocus && !validMatch ? "valid" : "hidden"}>
                                Confirmation password has to match passed password!
                            </p>

                            <button className={"submit input-user"}
                                    disabled={!validEmail || !validFirstName || !validLastName || !validPwd || !validMatch}>Sign
                                Up
                            </button>
                        </form>
                        <span className="sub">
                                <p>Already registered? </p>
                                <NavLink to={"/signIn"}>
                                    <div className={"link"}>
                                       Sign In
                                    </div>
                                </NavLink>
                        </span>
                        {errMsg === "" ? null : <Snackbar message={errMsg}/>}
                    </section>
                )}
            </div>
        </>
    )
}

export default UserForm;


