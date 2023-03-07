from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
# from wtforms import #fieldtypesneeded
DEFAULT_IMG = 'https://tinyurl.com/demo-cupcake'
db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    """Instances of Cupcake model"""

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, default=DEFAULT_IMG)

    def serialize(self):
        """Serializes a SQL-A object into a JSON compatible dictionary."""

        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }
