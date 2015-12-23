class Api::SpotsController < ApplicationController
  def index
    get_spots_from_params
    render :index
  end

  def show
    @spot = Spot.find(params[:id])
    render :show
  end

  private
  def get_spots_from_params
    @spots = Spot.all.includes(:tags)
    if params[:search]
      @spots = Spot.find_by_tag_partial(params[:search])
    end
  end
end
