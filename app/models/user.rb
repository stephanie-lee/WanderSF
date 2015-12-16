class User < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_session_token

  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, :session_token, uniqueness: true
  validates(
    :email,
    :first_name,
    :last_name,
    :password_digest,
    :session_token,
    :wanderer_title,
    presence: true
  )

  has_many :reviews

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password).to_s
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  private

  def generate_session_token
    SecureRandom::urlsafe_base64
  end
end
