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
      flash[:errors] = @review.errors.full_messages
    end
  end

  def update
    @review = Review.find(params[:review][:review_id])

    if @review.update(review_params)
      render :update
    else
      render json: @review.errors.full_messages
    end
  end

  def destroy

  end

  private
  def review_params
    params.require(:review).permit(:rating, :comment, :spot_id)
  end
end
