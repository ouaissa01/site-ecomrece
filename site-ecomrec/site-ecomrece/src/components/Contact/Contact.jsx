
import { Link } from 'react-router-dom';
 import "./form.css"

function Contact() {
  return (
      <div>
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Message</h3>
        <div className="label">
          <label for="username">Nom</label>
          <label for="Prenom" className='p'>Prenom</label>
        </div>

        <div className="info">
        <input type="text" placeholder="Nom" id="username"/>
        <input type="Prenom" placeholder="Prenom" id="Prenom"/>
        </div>
        <label for="Email">Email</label>
        <input type="email" placeholder="Email" id="Email"/>
        <label for="msg">Message</label>
        <textarea name="msg" id="msg" cols="30" rows="10"></textarea>
        <div className="btn">
        <button type='submit'>Envoyer</button>
        <button type='reset'>Annuler</button>
        </div>

    </form>
    </div>
  )
}

export default Contact;