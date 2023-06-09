import Layout from '../layouts/Main';
import Footer from '../components/footer';

const userInfo = () => {
// bang info, btw di database design (erd) itu ada attributes country, tapi karena cuma indo disini gak gua masukin, mungkin di
// backend dibikin auto assign aja semua user countrynya set ke indo, otherwise hapus attributenya aja karena gak guna (currency kita make rp juga)
    return (
        <div>
            <Layout>
                {/* Header */}
                <article style={{ backgroundImage: 'url(/images/featured-4.png)', backgroundSize: 'cover' }} className="header-user">
                    <div className="featured-item__content">
                        <h3 className='featured-item__content'>Complete Your Profile</h3>
                    </div>
                </article>
                <div className='container user-info'>
                    {/* User Information Section */}
                    <h3 className="block__title">User Information</h3>
                    <form className="form form-user">
                        <div className="form__input-row form__input-row--two">
                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="firstName"
                                    type="text"
                                    id='firstName'
                                    placeholder="First Name"
                                    required
                                />
                            </div>

                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="lastName"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>

                        </div>

                        <div className="form__input-row form__input-row--two">
                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>
                        {/* User Address Section */}
                        <h3 className="block__title">User Address</h3>
                        <div className="form__input-row form__input-row--two">
                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="firstName"
                                    type="text"
                                    id='rec-firstName'
                                    placeholder="Recipient First Name"
                                    required
                                />
                            </div>

                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="rec-lastName"
                                    type="text"
                                    id='rec-lastName'
                                    placeholder="Recipient Last Name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form__input-row form__input-row--two">
                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="rec-phone"
                                    type="text"
                                    id='rec-phone'
                                    placeholder="Recipient Phone Number"
                                    required
                                />
                            </div>

                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="rec-address"
                                    type="text"
                                    id='rec-address'
                                    placeholder="Recipient Address"
                                    required
                                />
                            </div>

                        </div>

                        <div className="form__input-row form__input-row--two">
                            <div className="form__col">
                                <input
                                    className="form__input form__input--sm"
                                    name="rec-postal"
                                    type="number"
                                    id='rec-postal'
                                    placeholder="Recipient Postal"
                                    required
                                />
                            </div>

                            <div className="form__col">
                                <div className="select-wrapper select-form">
                                    <select id="City">
                                        <option value="">Select City</option>
                                        <option value="Jakarta">Jakarta</option>
                                        <option value="Surabaya">Surabaya</option>
                                        <option value="Bandung">Bandung</option>
                                        <option value="Medan">Medan</option>
                                        <option value="Semarang">Semarang</option>
                                        <option value="Makassar">Makassar</option>
                                        <option value="Palembang">Palembang</option>
                                        <option value="Denpasar">Denpasar</option>
                                        <option value="Balikpapan">Balikpapan</option>
                                        <option value="Yogyakarta">Yogyakarta</option>
                                        <option value="Malang">Malang</option>
                                        <option value="Padang">Padang</option>
                                        <option value="Bandar Lampung">Bandar Lampung</option>
                                        <option value="Banjarmasin">Banjarmasin</option>
                                        <option value="Batam">Batam</option>
                                        <option value="Pekanbaru">Pekanbaru</option>
                                        <option value="Makassar">Makassar</option>
                                        <option value="Manado">Manado</option>
                                        <option value="Pontianak">Pontianak</option>
                                        <option value="Bogor">Bogor</option>
                                        <option value="Tangerang">Tangerang</option>
                                    </select>
                                </div>
                            </div>


                        </div>

                        <div className=''></div>
                        <button
                            type="submit"
                            className="btn pay btn--rounded btn--yellow btn-submit"
                        >
                            Save
                        </button>
                    </form>
                    {/* hello */}
                </div>
            </Layout>
            <Footer />
        </div>
    );
};

export default userInfo;
