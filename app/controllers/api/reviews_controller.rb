class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    render :index
  end

  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      render :create
    else
      render json: @review.errors.full_messages
    end
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  private
  def review_params
    params.require(:review).permit(:rating, :comment, :spot_id)
  end
end
